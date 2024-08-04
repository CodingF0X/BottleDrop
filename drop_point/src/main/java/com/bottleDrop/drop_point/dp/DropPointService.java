package com.bottleDrop.drop_point.dp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreakerFactory;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DropPointService {

    @Value("${notifyWarehouse.data.endpoint}")
    private String warehouse_endpoint;

    @Autowired
    private DiscoveryClient discoveryClient;

    @Autowired
    private Resilience4JCircuitBreakerFactory circuitBreakerFactory;

    @Autowired
    private RestTemplate restTemplate;

    private static final Logger LOGGER = Logger.getLogger(DropPointService.class.getName());
    private final DropPointRepository dropPointRepository;
    private int threshold = 10;

    public DropPointService(DropPointRepository dropPointRepository) {
        this.dropPointRepository = dropPointRepository;
    }

    // -- GET all drop points --//
    public List<DropPoint> getDropPoints() {
        return dropPointRepository.findAll();
    }

    // -- CREATE a new drop point --//
    public DropPoint saveDropPoint(DropPoint dropPoint) {
        return dropPointRepository.save(dropPoint);
    }

    // -- Drop bottles --//
    public DropPoint dropBottles(List<String> emptyBottles) {
        Optional<DropPoint> optionalDropPoint = dropPointRepository.findAll().stream().findFirst();
        if (optionalDropPoint.isEmpty()) {
            throw new RuntimeException("DropPoint not found");
        }

        DropPoint dropPoint = optionalDropPoint.get();
        List<String> empties = dropPoint.getEmpties();
        List<String> log = dropPoint.getLog();

        if (empties.size() >= threshold || (empties.size() + emptyBottles.size()) > threshold) {
            // dropPoint.setEmpties(List.of()); // Clear the empties
            notifyWarehouse();
        }

        empties.addAll(emptyBottles); // Add new empty bottles
        log.addAll(emptyBottles);
        return dropPointRepository.save(dropPoint);
    }

    // -- Notify Warehouse --//
    public String notifyWarehouse() {
        List<ServiceInstance> instances = discoveryClient.getInstances("Warehouse_Service");

        ServiceInstance serviceInstance = instances.get(0);
        String url = "http://" + serviceInstance.getInstanceId() + ":" + serviceInstance.getPort() + warehouse_endpoint;
        System.out.println(serviceInstance.getInstanceId());

        String jsonPayload = "{\"payload\": \"Drop point is full\"}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonPayload, headers);

        return circuitBreakerFactory.create("warehouseCircuitBreaker").run(() -> {
            try {
                ResponseEntity<String> response = restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        requestEntity,
                        String.class);
                LOGGER.info("Response Status Code: " + response.getStatusCode());
                LOGGER.info("Response from warehouse: " + response.getBody());

                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    System.out.println("Response from warehouse: " + response.getBody());
                } else {
                    System.out.println("Failed to get a successful response. Status code: " + response.getStatusCode());
                }

                Optional<DropPoint> optionalDropPoint = dropPointRepository.findAll().stream().findFirst();
                if (!optionalDropPoint.isPresent()) {
                    throw new IllegalStateException("No drop point found");
                }

                DropPoint dropPoint = optionalDropPoint.get();
                List<String> empties = dropPoint.getEmpties();
                if (empties == null) {
                    empties = new ArrayList<>();
                } else {
                    empties.clear();
                }
                dropPoint.setEmpties(empties);
                dropPointRepository.save(dropPoint);

                return response.getBody();

            } catch (Exception e) {
                LOGGER.severe("Error occurred while notifying warehouse: " + e.getMessage());
                throw e; // Rethrow to allow circuit breaker to handle it
            }
        }, throwable -> "Service is currently unavailable. Please try again later.");
    }

    // -- GET empties --//
    public List<String> emptiesList() {

        Optional<DropPoint> optionalDropPoint = dropPointRepository.findAll().stream().findFirst();
        DropPoint dropPoint = optionalDropPoint.get();

        return dropPoint.getEmpties();
    }

}
