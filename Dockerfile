FROM openjdk:20

WORKDIR ./job-board

COPY build/libs/*.jar ./job-board/job-board-service.jar

EXPOSE 8080:8080

ENTRYPOINT ["java","-jar", "./job-board/job-board-service.jar"]