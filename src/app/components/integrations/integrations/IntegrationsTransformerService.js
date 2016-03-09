function IntegrationsTransformerService(Integration) {

  this.integrationApiResponseTransformer = responseData => {
    function buildIntegration(data) {
      return Integration.build(_.extend(data, {
        modifiedDate: toDate(data.modifiedDate),
        createdDate: toDate(data.createdDate),
      }));
    }

    function toDate(candidate) {
      return moment(candidate).toDate();
    }

    if (_.isArray(responseData.data)) {
      return _.map(responseData.data, buildIntegration);
    } else {
      return buildIntegration(responseData.data);
    }
  };
}

export default IntegrationsTransformerService;
