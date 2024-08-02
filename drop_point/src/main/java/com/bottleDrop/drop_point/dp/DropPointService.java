package com.bottleDrop.drop_point.dp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Component
public class DropPointService {

    private static final Logger LOGGER = Logger.getLogger(DropPointService.class.getName());
    private final DropPointRepository dropPointRepository;
    private static final String warehouse_URL = "http://localhost:5000/api/warehouse/notification";

    @Autowired
    private RestTemplate restTemplate;

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

        if (empties.size() >= 6 || (empties.size() + emptyBottles.size()) > 6) {
            dropPoint.setEmpties(List.of()); // Clear the empties
        }

        empties.addAll(emptyBottles); // Add new empty bottles
        log.addAll(emptyBottles);
        return dropPointRepository.save(dropPoint);
    }

    // -- Notify Warehouse --//
    public String notifyWarehouse() {
        String jsonPayload = "{\"payload\": \"Drop point is full\"}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonPayload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    warehouse_URL,
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
            return "Error";
        }
    }

    //-- GET empties --//
    public List<String> emptiesList(){

        Optional<DropPoint> optionalDropPoint = dropPointRepository.findAll().stream().findFirst();
        DropPoint dropPoint = optionalDropPoint.get();
        
        return dropPoint.getEmpties();
    }

}
