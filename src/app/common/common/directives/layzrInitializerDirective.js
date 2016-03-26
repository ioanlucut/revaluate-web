function layzrInitializerDirective() {
  return {
    restrict: 'A',
    link() {

      new Layzr();
    },
  };
}

export default layzrInitializerDirective;
