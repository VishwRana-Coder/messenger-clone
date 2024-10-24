import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/Components/EmptyState";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Form from "./Components/Form";

interface IParams {
    conversationId: string;
}
const ConversationId = async ({ params } : {params: IParams}) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);


    if(!conversation){
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }
    return(
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages}/>
                <Form />
            </div>
        </div>
    )
}
export default ConversationId