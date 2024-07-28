package com.bottleDrop.drop_point.dp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class DropPointService {

    private final DropPointRepository dropPointRepository;

    public DropPointService(DropPointRepository dropPointRepository) {
        this.dropPointRepository = dropPointRepository;
    }

    //-- GET all drop points --//
    public List<DropPoint> getDropPoints() {

        return dropPointRepository.findAll();
    }

    //-- CREATE a new drop point --//
    public DropPoint saveDropPoint(DropPoint dropPoint) {
        return dropPointRepository.save(dropPoint);
    }

    //-- Drop bottles --//
    public DropPoint dropBottles(Long dropPointId, List<Long> emptyBottles) {
        Optional<DropPoint> optionalDropPoint = dropPointRepository.findById(dropPointId);
        if (optionalDropPoint.isEmpty()) {
            throw new RuntimeException("DropPoint not found");
        }

        DropPoint dropPoint = optionalDropPoint.get();
        List<Long> empties = dropPoint.getEmpties();

        if (empties.size() >= 6 || (empties.size() + emptyBottles.size()) > 6) {
            dropPoint.setEmpties(List.of()); // Clear the empties
        }

        empties.addAll(emptyBottles); // Add new empty bottles
        dropPoint.setLog(emptyBottles); // Update the log with new empty bottles

        return dropPointRepository.save(dropPoint);
    }


}
