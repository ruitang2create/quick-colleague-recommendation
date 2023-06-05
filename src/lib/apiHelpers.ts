export const getHardSkillsByJob = async (job: string): Promise<string[]> => {
    try {
        const response = await fetch("/api/hard-skills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ job }),
        });

        const data = await response.json();
        const { result } = data;
        if (response.status != 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        const { hardSkills } = JSON.parse(result);
        return hardSkills;
    } catch(error) {
        console.error(error);
        throw error;
    }
}