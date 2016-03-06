function unisonListenerDirective(UNISON_BREAKPOINTS, UNISON_EVENTS) {
  return {
    restrict: 'E',
    link(scope) {

      Unison
        .on('change', bp => {
          switch (bp.name) {
            case UNISON_BREAKPOINTS.USN_X_SMALL.name:
            case UNISON_BREAKPOINTS.USN_SMALL.name:
            case UNISON_BREAKPOINTS.USN_SMALL_MEDIUM.name:
            case UNISON_BREAKPOINTS.USN_MEDIUM.name:
            case UNISON_BREAKPOINTS.USN_LARGE.name:
            case UNISON_BREAKPOINTS.USN_LARGE_MEDIUM.name:
            case UNISON_BREAKPOINTS.USN_X_LARGE.name:
              scope.$broadcast(UNISON_EVENTS.USN_FIRE, bp.name);
              break;
          }
        });
    },
  };
}

export default unisonListenerDirective;
