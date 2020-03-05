package com.neelkamath.osmosis.server.test

import com.neelkamath.osmosis.server.main
import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.ktor.application.Application
import io.ktor.http.HttpMethod
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.withTestApplication

// Tests for the `/health_check` endpoint.
class HealthCheckTest : StringSpec({
    "A health check request should beckon a status code of 204" {
        withTestApplication(Application::main) {
            with(handleRequest(HttpMethod.Get, "/health_check")) { response.status()!!.value shouldBe 204 }
        }
    }
})
