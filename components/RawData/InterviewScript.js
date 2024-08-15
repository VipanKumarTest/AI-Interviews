export default interviewScript = (jobRole, expertiseIn, yearsOfExperience = 0) => {
    const data = `Create a JSON-formatted list of 5 interview questions with answers for a ${jobRole} position that requires expertise in ${expertiseIn}, and ${yearsOfExperience} years of experience. Each question and answer should be provided as fields in the JSON.`
    return data;
}