import {RequestHandler, RMContentType} from '@taci-tech/launchpad-js';

export const getActivityGrid = () => {
  return {
    onStart: () => [],
    onOverride: ({setState, setIsLoading, newValue}) => {
      if (!newValue || !newValue.id || newValue.id.length === 0) {
        setState([]);
        setIsLoading(false);
        return;
      }

      const eaiTransactionId = newValue.id;
      const businessDomains = newValue.businessDomain || undefined;
      const severities = newValue.severity || undefined;

      const newEntry = {
        'eaiTransactionId': eaiTransactionId,
        'businessDomain': businessDomains,
        'severities': severities,
      };

      setIsLoading(true);
      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessProcessGrid',
        config: {
          contentType: RMContentType.JSON,
          query: newEntry,
        },
        handler: {
          200: (data) => {
            setIsLoading(false);
            console.log('table data', data);
            setState(data);
          },
          0: () => {
            setIsLoading(false);
            setState([]);
          },
        },
      });
    },
  };
};

export const getBusinessDomainList = () => {
  return {
    onStart: () => [],
    onMount: ({setState, setIsLoading}) => {
      setIsLoading(true);
      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessDomains',
        config: {
          contentType: RMContentType.JSON,
        },
        handler: {
          200: (data) => {
            setIsLoading(false);
            setState(data);
          },
          0: () => {
            setIsLoading(false);
            setState([]);
          },
        },
      });
    },
  };
};