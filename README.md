![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-cron-tasks 

Moleculer Service for https://www.npmjs.com/package/node-cron

```js
import { ServiceBroker } from 'moleculer';
import CronTasks, { CronTask } from '@skoropletov/moleculer-cron-tasks';

const brokerNode1 = new ServiceBroker({
  nodeID: 'node-1',
});

brokerNode1.createService({
  name: 'cron-service',
  mixins: [CronTasks],
  tasks: [
    {
      name: 'log-seconds',
      cronTime: '* * * * * *',
      callback: (): void => {
        console.log('[!] second passed');
      },
    }
  ] as CronTask[]
});
```