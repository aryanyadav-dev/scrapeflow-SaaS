import { ExecutionEnvironment } from '@/types/executor';
import { TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

import { LaunchBrowserExecutor } from '@/lib/workflow/executor/launch-browser-executor';
import { PageToHtmlExecutor } from '@/lib/workflow/executor/page-to-html-executor';
import { ExtractTextFromElementExecutor } from '@/lib/workflow/executor/extract-text-from-element-executor';
import { FillInputExecutor } from '@/lib/workflow/executor/fill-input-executor';
import { ClickElementExecutor } from '@/lib/workflow/executor/click-element-executor';
import { WaitForElementExecutor } from '@/lib/workflow/executor/wait-for-element-executor';
import { DeliverViaWebhookExecutor } from '@/lib/workflow/executor/deliver-via-webhook-executor';
import { ExtractDataWithAiExecutor } from '@/lib/workflow/executor/extract-data-with-ai-executor';
import { ReadPropertyFromJsonExecutor } from '@/lib/workflow/executor/read-property-from-json-executor';
import { AddPropertyToJsonExecutor } from '@/lib/workflow/executor/add-property-to-json-executor';
import { NavigateUrlExecutor } from '@/lib/workflow/executor/navigate-url-executor';
import { ScrollToElementExecutor } from '@/lib/workflow/executor/scroll-to-element-executor';

type ExecuterFn<T extends WorkflowTask> = (environment: ExecutionEnvironment<T>) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecuterFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
  NAVIGATE_URL: NavigateUrlExecutor,
  SCROLL_TO_ELEMENT: ScrollToElementExecutor,
};
