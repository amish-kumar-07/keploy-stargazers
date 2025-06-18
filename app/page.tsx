/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { useState } from "react";
import DataExport from "@/components/data-handlers/DataExport";
import {
  extractRepoPath,
  fetchAllStargazers,
  enrichStargazers,
} from "@/services/githubServices";

import { Eye, EyeOff, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface Stargazer {
  login: string;
  starred_at: string;
  [key: string]: any;
}

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [githubTokens, setGithubTokens] = useState("");
  const [showTokens, setShowTokens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stargazers, setStargazers] = useState<Stargazer[]>([]);
  const [last24Hours, setLast24Hours] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<string>("");


  const isValidGitHubUrl = (url: string): boolean => {
    const githubUrlPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    return githubUrlPattern.test(url.trim());
  };


  const isValidGitHubTokens = (tokens: string): boolean => {
    if (!tokens.trim()) return false;
    const tokenArray = tokens.split(',').map(token => token.trim());

    const tokenPattern = /^gh[ops]_[A-Za-z0-9_]{36,}$/;
    return tokenArray.every(token => tokenPattern.test(token));
  };

  const handleFetchStargazers = async (fetchLast24Hours = false) => {

    setError("");
    

    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    if (!isValidGitHubUrl(repoUrl)) {
      setError("Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo)");
      return;
    }

    if (!githubTokens.trim()) {
      setError("Please enter your GitHub personal access token(s)");
      return;
    }

    if (!isValidGitHubTokens(githubTokens)) {
      setError("Please enter valid GitHub personal access token(s). Tokens should start with 'ghp_', 'gho_', or 'ghs_'");
      return;
    }

    setLoading(true);
    setHasFetched(false);
    setLast24Hours(fetchLast24Hours);

    try {
      const repoPath = extractRepoPath(repoUrl.trim());
      if (!repoPath) {
        throw new Error("Unable to extract repository path from URL");
      }

      let stargazersData = await fetchAllStargazers(repoPath, githubTokens.trim());

      if (fetchLast24Hours) {
        const last24hTimestamp = new Date();
        last24hTimestamp.setHours(last24hTimestamp.getHours() - 24);
        stargazersData = stargazersData.filter(
          (star: Stargazer) => new Date(star.starred_at) >= last24hTimestamp
        );
      }

      const enrichedStargazers = await enrichStargazers(stargazersData, githubTokens.trim());
      setStargazers(enrichedStargazers);
      
      if (enrichedStargazers.length === 0) {
        setError(fetchLast24Hours ? 
          "No stargazers found in the last 24 hours" : 
          "This repository has no stargazers yet");
      }
    } catch (error: any) {
      console.error("Error fetching stargazers:", error);
      

      if (error.message?.includes('404')) {
        setError("Repository not found. Please check the URL and ensure the repository exists and is public.");
      } else if (error.message?.includes('401') || error.message?.includes('403')) {
        setError("Authentication failed. Please check your GitHub token and ensure it has the necessary permissions.");
      } else if (error.message?.includes('rate limit')) {
        setError("GitHub API rate limit exceeded. Please try again later or use multiple tokens.");
      } else {
        setError(error.message || "An error occurred while fetching stargazers. Please try again.");
      }
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetchStargazers(false);
  };

 return (
  <div className="relative flex flex-col items-center justify-center min-h-screen w-screen overflow-hidden bg-black px-4 py-8">

    <div
      className={cn(
        "absolute inset-0 z-0",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      )}
    />

    <div className="pointer-events-none absolute inset-0 z-10 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

    <Card className="z-20 w-full max-w-xl flex flex-col items-center bg-[#161B22] border border-gray-700 shadow-xl rounded-2xl p-6">
      <CardHeader className="text-center mb-2">
        <CardTitle className="text-[#C9D1D9] text-3xl font-semibold">
          GitHub Stargazers Data
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="repoUrl" className="text-[#C9D1D9]">
              GitHub Repository URL
            </Label>
            <Input
              id="repoUrl"
              type="text"
              placeholder="https://github.com/owner/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-[#0D1117] text-white border border-gray-600 focus:border-green-500"
              disabled={loading}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="githubTokens" className="text-[#C9D1D9]">
              GitHub Personal Access Token(s)
            </Label>
            <div className="relative">
              <Input
                id="githubTokens"
                type={showTokens ? "text" : "password"}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={githubTokens}
                onChange={(e) => setGithubTokens(e.target.value)}
                className="bg-[#0D1117] text-white border border-gray-600 focus:border-green-500 pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowTokens(!showTokens)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                disabled={loading}
              >
                {showTokens ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center w-full mt-4 space-y-4">
        {/* Error */}
        {error && (
          <Alert className="w-full bg-red-900/20 border border-red-700 text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        
        <div className="flex flex-col w-full space-y-2">
          <Button
            onClick={() => handleFetchStargazers(false)}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            {loading && !last24Hours ? "Fetching..." : "Fetch All Stargazers"}
          </Button>
          <Button
            onClick={() => handleFetchStargazers(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading && last24Hours ? "Fetching..." : "Fetch Last 24 Hours"}
          </Button>
        </div>

       
        {loading && <Loading />}

       
        {hasFetched && stargazers.length > 0 && (
          <div className="w-full mt-4">
            <DataExport
              stargazers={stargazers}
              last24Hours={last24Hours}
              setLast24Hours={setLast24Hours}
            />
            <p className="text-center text-gray-400 mt-2">Here You Go!</p>
          </div>
        )}

        {hasFetched && stargazers.length === 0 && !loading && !error && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            No stargazers found{last24Hours ? " in the last 24 hours" : ""}
          </p>
        )}
      </CardFooter>
    </Card>
  </div>
);
}