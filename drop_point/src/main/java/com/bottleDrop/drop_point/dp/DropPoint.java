package com.bottleDrop.drop_point.dp;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class DropPoint {

    @Id
    @SequenceGenerator(name = "dropPoint_sequence", sequenceName = "dropPoint_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dropPoint_sequence")
    private Long id;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int capacity;

    @ElementCollection
    private List<Long> empties;

    @ElementCollection
    private List<Long> log;

    @Column(updatable = false)
    private java.sql.Timestamp createdAt;

    private java.sql.Timestamp updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new java.sql.Timestamp(System.currentTimeMillis());
        this.updatedAt = new java.sql.Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new java.sql.Timestamp(System.currentTimeMillis());
    }

    public DropPoint() {
    }

    public DropPoint(Long id, String location, int capacity, List<Long> empties, List<Long> log) {
        this.id = id;
        this.location = location;
        this.capacity = capacity;
        this.empties = empties;
        this.log = log;
    }

    public Long getId() {
        return id;
    }

    public int getCapacity() {
        return capacity;
    }

    public String getLocation() {
        return location;
    }

    public List<Long> getEmpties() {
        return empties;
    }

    public List<Long> getLog() {
        return log;
    }

    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }

    public java.sql.Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setEmpties(List<Long> empties) {
        this.empties = empties;
    }

    public void setLog(List<Long> log) {
        this.log = log;
    }

    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(java.sql.Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
