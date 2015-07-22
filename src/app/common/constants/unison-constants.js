'use strict';

angular
    .module("revaluate.common")
    .constant("UNISON_BREAKPOINTS", {
        USN_LARGE: "usn-large",
        USN_MEDIUM: "usn-medium",
        USN_SMALL: "usn-small"
    })
    .constant("UNISON_EVENTS", {
        USN_FIRE: "usn-fire"
    });
