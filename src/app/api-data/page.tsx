"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import Link from "next/link";
import { AlertCircle, ArrowLeft, GitFork, Star } from "lucide-react";
import Button from "@/components/UI/Button";
import { Badge } from "@/components/UI/Badge";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";

interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
    updated_at: string;
}

const fetchRepos = async (): Promise<Repository[]> => {
    const response = await fetch(
        "https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=9"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.items;
};

export default function ApiData() {
    const { data: repos, isLoading, error } = useQuery({
        queryKey: ["repos"],
        queryFn: fetchRepos,
    });

    if (error) {
        return (
            <div className="min-h-screen bg-background p-4">
                <div className="container mx-auto max-w-4xl">
                    <Link href="/">
                        <Button className="mb-4" text="Back" />
                    </Link>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-5 w-5" />
                                Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Failed to load data</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8">
                    <Link href="/">
                        <Button className="mb-4" text="Back" variant="outline" />
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Popular Repositories</h1>
                    <p className="text-muted-foreground">Most starred GitHub repositories</p>
                </div>

                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <div className="h-6 w-3/4 bg-muted rounded-md animate-pulse" />
                                    <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
                                        <div className="h-4 w-2/3 bg-muted rounded-md animate-pulse" />
                                        {/* <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3" /> */}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos?.map((repo: Repository) => (
                            <Card key={repo.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                            {repo.name}
                                        </a>
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">{repo.full_name}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {repo.description || "No description"}
                                    </p>

                                    {repo.language && (
                                        <Badge variant="secondary" className="mb-4">{repo.language}</Badge>
                                    )}

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4" />
                                            <span>{repo.stargazers_count.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork className="h-4 w-4" />
                                            <span>{repo.forks_count.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
