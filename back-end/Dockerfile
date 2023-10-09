FROM azul/zulu-openjdk-alpine:19-latest
VOLUME /tmp
ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n
COPY build/libs/back-end-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
