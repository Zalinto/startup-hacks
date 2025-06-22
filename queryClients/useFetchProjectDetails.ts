import {
    useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

async function getProjectDetails(project_id: string) {
    try {
        const response = await axios.get(`http://localhost:8080/api/project/${project_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error)
        return null
    }
}

export const useFetchProjectDetails = (project_id: string, user_id: string) => {
    const projectDetails = useQuery({
        queryKey: ["projectDetails", user_id],
        queryFn: () => getProjectDetails(project_id), 
        enabled: !!user_id && !!project_id,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 5,
    });

    return {
        projectDetails: projectDetails.data,
        isLoading: projectDetails.isLoading,
    };
};