import {
    useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

async function getBrainstormingChat(project_id: string) {
    try {
        // @TODO: Still need to finish brainstorming fetch.ai implementation.
        const response = await axios.get(`http://localhost:8080/api/project/${project_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error)
        return null
    }
}

export const useFetchChat = (project_id: string, user_id: string) => {
        const chat = useQuery({
        queryKey: ["chat", user_id],
        queryFn: () => getBrainstormingChat(project_id), 
        enabled: !!user_id && !!project_id,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 5,
    });

    return {
        chat: chat.data,
    };
};