import { PageToHtmlTask } from '@/lib/workflow/task/page-to-html';
import { ExecutionEnvironment } from '@/types/executor';

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput('Html', html);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
