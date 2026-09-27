FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy Maven wrapper and configuration files first to leverage build cache
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Render dynamically sets PORT environment variable (typically 10000)
ENV PORT=10000
EXPOSE ${PORT}

CMD ["sh", "-c", "java -jar target/Backend-0.0.1-SNAPSHOT.jar --server.port=${PORT}"]

