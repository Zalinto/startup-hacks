import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

async function getProjects() {
    try {
        const response = await axios.get("http://localhost:8080/api/project");
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error)
        return null
    }
}

async function createProject(title: string) {
    try {
        await axios.post("http://localhost:8080/api/project", {
            project_name: title
        });
        return;
    } catch (error) {
        console.error("Error creating project:", error)
        return null
    }
}

export const useFetchProjects = (user_id: string) => {
    const queryClient = useQueryClient();
    
    const addProjectMutation = useMutation({
        mutationFn: ({ title }: { title: string}) =>
            createProject(title),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", user_id] });
        },
    });

    const projects = useQuery({
        queryKey: ["projects", user_id],
        queryFn: () => getProjects(), 
        enabled: !!user_id,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 5,
    });

    return {
        addProject: addProjectMutation.mutate,
        projects,
    };
};