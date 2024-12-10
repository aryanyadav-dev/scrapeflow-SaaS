import { ReadPropertyFromJsonTask } from '@/lib/workflow/task/read-property-from-json';
import { ExecutionEnvironment } from '@/types/executor';

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput('JSON');
    if (!jsonData) {
      environment.log.error('input->JSON not defined');
    }

    const propertyName = environment.getInput('Property name');
    if (!propertyName) {
      environment.log.error('input->propertyName not defined');
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyName];
    if (propertyValue === undefined) {
      environment.log.error('Property not found');
      return false;
    }

    environment.setOutput('Property value', propertyValue);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
