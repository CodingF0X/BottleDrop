# Step 1: Build the application
FROM maven:3.8.3-openjdk-17 AS maven_builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Prepare the runtime image
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=maven_builder /app/target/server-0.0.1-SNAPSHOT.jar ./server.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "server.jar"]


