const sidebarComponent = {
  controller($state, $rootScope) {
    'ngInject';

    this.$state = $state;
    this.user = $rootScope.currentUser;
  },

  templateUrl: '/app/common/sidebar/sidebarComponent.tpl.html',
};

export default sidebarComponent;
