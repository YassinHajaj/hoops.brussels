# Stage 1: Build the Quarkus application using Maven
FROM public.ecr.aws/docker/library/maven:3.9.3-eclipse-temurin-20 AS build
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package -Dquarkus.package.type=fast-jar

# Stage 2: Run the Quarkus application
FROM public.ecr.aws/docker/library/eclipse-temurin:20.0.2_9-jre
ENV JAVA_APP_DIR=/deployments
EXPOSE 8080
COPY --from=build /app/target/quarkus-app/lib $JAVA_APP_DIR/lib/
COPY --from=build /app/target/quarkus-app/quarkus-run.jar $JAVA_APP_DIR/app.jar
COPY --from=build /app/target/quarkus-app/app/ $JAVA_APP_DIR/app/
COPY --from=build /app/target/quarkus-app/quarkus/ $JAVA_APP_DIR/quarkus/
ENTRYPOINT [ "sh", "-c", "java -jar $JAVA_APP_DIR/app.jar" ]
