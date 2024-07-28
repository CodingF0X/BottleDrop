package com.bottleDrop.drop_point.dp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class DropPointService {

    private final DropPointRepository dropPointRepository;

    public DropPointService(DropPointRepository dropPointRepository) {
        this.dropPointRepository = dropPointRepository;
    }

    public List<DropPoint> getDropPoints() {

        return dropPointRepository.findAll();
    }
}
