"use client";

import Button from "@/components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Database, FormInput } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Demo App</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            API integration and multi-step forms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6" />
                API Data
              </CardTitle>
              <CardDescription>
                GitHub repositories data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/api-data" className="cursor-pointer">
                <Button className="w-full" text="View Data" key={"View Data"} />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FormInput className="h-6 w-6" />
                Multi-Step Form
              </CardTitle>
              <CardDescription>
                3-step form with file upload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/multi-step-form">
                <Button className="w-full" text="Open Form" key={"Open Form"} />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
