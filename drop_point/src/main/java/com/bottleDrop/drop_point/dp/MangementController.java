package com.bottleDrop.drop_point.dp;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/drop_point")
public class MangementController {

    private DropPointService dropPointService;

    public MangementController(DropPointService dropPointService) {
        this.dropPointService = dropPointService;
    }

    @GetMapping
    public ResponseEntity<List<DropPoint>> getDropPoints() {
        List<DropPoint> dropPoints = dropPointService.getDropPoints();

        return new ResponseEntity<>(dropPoints, HttpStatus.OK);
    }

    @PostMapping
    public DropPoint createDropPoint(@RequestBody DropPoint dropPoint) {
        return dropPointService.saveDropPoint(dropPoint);
    }

    @PostMapping("/dropBottles")
    public ResponseEntity <DropPoint> dropBottles(
            @RequestBody DropBottleRequest emptyBottles) {
                DropPoint dropPoint = dropPointService.dropBottles(emptyBottles.getEmptyBottles());
        return new ResponseEntity<>(dropPoint, HttpStatus.OK);
    }
}
