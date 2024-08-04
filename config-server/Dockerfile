# Step 1: Build the application
FROM maven:3.8.3-openjdk-17 AS maven_builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
# # Copy the configuration folder into the Docker image
COPY src/main/resources/config /app/config
RUN mvn clean package -DskipTests

# Step 2: Prepare the runtime image
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=maven_builder /app/target/config-server-0.0.1-SNAPSHOT.jar ./config-server.jar
COPY --from=maven_builder /app/src/main/resources/config ./app/config
EXPOSE 8888

ENTRYPOINT ["java", "-jar", "config-server.jar"]

# FROM openjdk:17-jdk-slim

# WORKDIR /app

# COPY target/config-server-0.0.1-SNAPSHOT.jar /app/config-server.jar

# # Copy the configuration folder into the Docker image
# COPY src/main/resources/config /app/config

# EXPOSE 8888

# ENTRYPOINT ["java", "-jar", "/app/config-server.jar"]

# Run the jar file with the appropriate profile and native search location
# ENTRYPOINT ["java", "-jar", "/app/config-server.jar", "--spring.profiles.active=native", "--spring.cloud.config.server.native.search-locations=file:/app/config"]
