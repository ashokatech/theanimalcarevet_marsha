import {requireChatGPTUser} from '../chatgpt-auth';
import Clinic from './workspace';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/clinic');return <Clinic/>}
