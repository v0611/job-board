package com.jobboard.service;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class PostgreslDataSource {
//    spring.application.name=jobboard
//    spring.jpa.hibernate.ddl-auto=update
//    spring.jpa.show-sql=true
//    spring.jpa.properties.hibernate.format_sql=true
//    spring.servlet.multipart.max-file-size=10MB
//    spring.servlet.multipart.max-request-size=10MB
    @Bean
    public DataSource getDataSource() {
        var dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.postgresql.Driver");
        dataSourceBuilder.url(getOrDefault("POSTGRES_URL", "jdbc:postgresql://localhost:5432/jobboard"));
        dataSourceBuilder.username(getOrDefault("POSTGRES_USER", "admin"));
        dataSourceBuilder.password(getOrDefault("POSTGRES_PASSWORD", "admin"));
        return dataSourceBuilder.build();
    }

    public String getOrDefault(String key, String defaultValue){
        var value = System.getenv(key);
        if(value == null){
            return defaultValue;
        }

        return value;
    }
}
