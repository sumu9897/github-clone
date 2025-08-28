import { promises as fs } from "fs";
import path from "path"

export default async function initRepo(){
    const repoPath = path.resolve(process.cwd(), ".sumuGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath,{recursive:true});
        await fs.mkdir(commitsPath,{recursive:true});
        await fs.writeFile(
            path.join(repoPath, "config.json"), 
            JSON.stringify({ bucket: process.env.S3_BUCKET})
        );
        console.log("Repository initialised!");
        
    } catch (error) {
        console.error("Error initialising repository",error);
        
    }
    
}