import {requireChatGPTUser} from '../chatgpt-auth';
import Booking from './booking';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/book');return <Booking/>}
