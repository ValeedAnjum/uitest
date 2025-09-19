"use client";

import { Button } from "@/components/ui/button";
import { Download, Database, Loader2 } from "lucide-react";
import { useState } from "react";

interface CountyData {
  state: string;
  county: string;
  population: number;
  fips: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountiesData = async (): Promise<CountyData[]> => {
    try {
      // US Census Bureau ACS 5-year data (2022) for county population - more reliable endpoint
      const response = await fetch(
        "https://api.census.gov/data/2022/acs/acs5?get=NAME,B01003_001E&for=county:*"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform the data to match our interface
      // ACS API returns: [["NAME","B01003_001E","state","county"], ["County Name, State","12345","01","001"], ...]
      return data
        .slice(1)
        .map((row: any[], index: number) => {
          const [fullName, population, state, county] = row;
          const [countyName, stateName] = fullName.split(","); // Extract county and state name

          return {
            id: index + 1,
            name: countyName.trim(),
            state: stateName ? stateName.trim() : state,
            population: parseInt(population) || 0,
            county: county,
          };
        })
        .sort((a: any, b: any) => b.population - a.population); // Sort by population descending
    } catch (error) {
      console.error("Error fetching counties data:", error);
      throw new Error(
        "Failed to fetch counties data from US Census Bureau API"
      );
    }
  };

  const convertToCSV = (counties: CountyData[]): string => {
    const headers = ["Rank", "County", "State", "Population"];
    const csvRows = [headers.join(",")];

    counties.forEach((county, index) => {
      const row = [
        (index + 1).toString(),
        `"${county.county}"`,
        `"${county.state}"`,
        county.population.toString(),
      ];
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  };

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const counties = await fetchCountiesData();
      const csvContent = convertToCSV(counties);

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `us-counties-by-population-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Database className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              US Counties by
              <span className="text-blue-600"> Population</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Download real-time US counties data ranked by population from the
              official US Census Bureau API. Get comprehensive CSV data for
              analysis and research.
            </p>
          </div>

          {/* Features Grid */}

          {/* Download Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Download Counties Data
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Get the latest population data for all US counties, ranked from
              highest to lowest population. Includes county names, states,
              population figures.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleDownload}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Fetching Data...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Download CSV File
                </>
              )}
            </Button>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                File format: CSV • Source: US Census Bureau • Data: 2022
                Population Estimates
              </p>
            </div>
          </div>

          {/* Data Preview */}
          <div className="mt-12 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              CSV Data Structure
            </h3>
            <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono">
                {`Rank,County,State,Population
1,"Los Angeles County","California",9829544
2,"Cook County","Illinois",5275541
3,"Harris County","Texas",4731145
4,"Maricopa County","Arizona",4485414
5,"San Diego County","California",3298634
6,"Orange County","California",3186989
7,"Miami-Dade County","Florida",2701767
8,"Kings County","New York",2590516
9,"Dallas County","Texas",2613539
10,"Queens County","New York",2405464
...`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
