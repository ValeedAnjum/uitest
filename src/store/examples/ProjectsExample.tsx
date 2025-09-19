// "use client";

// import { useState } from "react";
// import {
//   useGetProjectsQuery,
//   useGetProjectQuery,
//   useCreateProjectMutation,
//   useUpdateProjectMutation,
//   useDeleteProjectMutation,
//   Project,
// } from "@/store/api";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// /**
//  * Example component demonstrating RTK Query usage
//  * This shows how to:
//  * - Fetch data with queries
//  * - Create, update, and delete with mutations
//  * - Handle loading and error states
//  * - Use the generated TypeScript types
//  */
// export function ProjectsExample() {
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
//     null
//   );

//   // Queries - automatically fetch data and manage cache
//   const {
//     data: projects,
//     error: projectsError,
//     isLoading: projectsLoading,
//     refetch: refetchProjects,
//   } = useGetProjectsQuery();

//   const {
//     data: selectedProject,
//     error: projectError,
//     isLoading: projectLoading,
//   } = useGetProjectQuery(selectedProjectId!, {
//     skip: !selectedProjectId, // Don't fetch if no project selected
//   });

//   // Mutations - for creating, updating, deleting
//   const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
//   const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
//   const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

//   // Example handlers
//   const handleCreateProject = async () => {
//     try {
//       const newProject: Partial<Project> = {
//         name: "New Safety Project",
//         description: "A sample safety assurance project",
//         status: "draft" as const,
//         ownerId: "current-user-id",
//         collaborators: [],
//         safetyCases: [],
//       };

//       const result = await createProject(newProject).unwrap();
//       console.log("Created project:", result);
//       // The cache will automatically update and re-render components
//     } catch (error) {
//       console.error("Failed to create project:", error);
//     }
//   };

//   const handleUpdateProject = async (projectId: string) => {
//     try {
//       const updates: Partial<Project> = {
//         name: "Updated Project Name",
//         description: "Updated description",
//       };

//       const result = await updateProject({
//         id: projectId,
//         data: updates,
//       }).unwrap();
//       console.log("Updated project:", result);
//     } catch (error) {
//       console.error("Failed to update project:", error);
//     }
//   };

//   const handleDeleteProject = async (projectId: string) => {
//     try {
//       await deleteProject(projectId).unwrap();
//       console.log("Deleted project:", projectId);

//       // Clear selection if deleted project was selected
//       if (selectedProjectId === projectId) {
//         setSelectedProjectId(null);
//       }
//     } catch (error) {
//       console.error("Failed to delete project:", error);
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>RTK Query Example - Projects Management</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Create new project */}
//           <div>
//             <Button
//               onClick={handleCreateProject}
//               disabled={isCreating}
//               className="mb-4"
//             >
//               {isCreating ? "Creating..." : "Create New Project"}
//             </Button>
//           </div>

//           {/* Projects list */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">All Projects</h3>

//             {projectsLoading && <p>Loading projects...</p>}

//             {projectsError && (
//               <div className="text-red-500">
//                 Error loading projects: {JSON.stringify(projectsError)}
//                 <Button
//                   onClick={refetchProjects}
//                   variant="outline"
//                   size="sm"
//                   className="ml-2"
//                 >
//                   Retry
//                 </Button>
//               </div>
//             )}

//             {projects && (
//               <div className="grid gap-2">
//                 {projects.map((project) => (
//                   <Card
//                     key={project.id}
//                     className={`cursor-pointer transition-colors ${
//                       selectedProjectId === project.id ? "bg-primary/10" : ""
//                     }`}
//                     onClick={() => setSelectedProjectId(project.id)}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-medium">{project.name}</h4>
//                           <p className="text-sm text-muted-foreground">
//                             {project.description}
//                           </p>
//                           <span className="text-xs bg-secondary px-2 py-1 rounded">
//                             {project.status}
//                           </span>
//                         </div>
//                         <div className="flex gap-2">
//                           <Button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleUpdateProject(project.id);
//                             }}
//                             disabled={isUpdating}
//                             variant="outline"
//                             size="sm"
//                           >
//                             Update
//                           </Button>
//                           <Button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteProject(project.id);
//                             }}
//                             disabled={isDeleting}
//                             variant="destructive"
//                             size="sm"
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}

//                 {projects.length === 0 && (
//                   <p className="text-muted-foreground">
//                     No projects found. Create one to get started!
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Selected project details */}
//           {selectedProjectId && (
//             <div>
//               <h3 className="text-lg font-semibold mb-2">
//                 Selected Project Details
//               </h3>

//               {projectLoading && <p>Loading project details...</p>}

//               {projectError && (
//                 <p className="text-red-500">
//                   Error loading project: {JSON.stringify(projectError)}
//                 </p>
//               )}

//               {selectedProject && (
//                 <Card>
//                   <CardContent className="p-4">
//                     <h4 className="font-medium mb-2">{selectedProject.name}</h4>
//                     <p className="text-sm text-muted-foreground mb-2">
//                       {selectedProject.description}
//                     </p>
//                     <div className="text-xs space-y-1">
//                       <p>
//                         <strong>Status:</strong> {selectedProject.status}
//                       </p>
//                       <p>
//                         <strong>Owner:</strong> {selectedProject.ownerId}
//                       </p>
//                       <p>
//                         <strong>Collaborators:</strong>{" "}
//                         {selectedProject.collaborators.length}
//                       </p>
//                       <p>
//                         <strong>Safety Cases:</strong>{" "}
//                         {selectedProject.safetyCases.length}
//                       </p>
//                       <p>
//                         <strong>Created:</strong>{" "}
//                         {new Date(
//                           selectedProject.createdAt
//                         ).toLocaleDateString()}
//                       </p>
//                       <p>
//                         <strong>Updated:</strong>{" "}
//                         {new Date(
//                           selectedProject.updatedAt
//                         ).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           )}

//           {/* Usage notes */}
//           <Card className="mt-6">
//             <CardContent className="p-4">
//               <h4 className="font-medium mb-2">
//                 🔍 What&apos;s happening here?
//               </h4>
//               <ul className="text-sm space-y-1 text-muted-foreground">
//                 <li>
//                   • <strong>Automatic caching:</strong> Data is cached and
//                   shared across components
//                 </li>
//                 <li>
//                   • <strong>Optimistic updates:</strong> UI updates immediately,
//                   rolls back on error
//                 </li>
//                 <li>
//                   • <strong>Background refetching:</strong> Data stays fresh
//                   automatically
//                 </li>
//                 <li>
//                   • <strong>Loading states:</strong> Built-in loading and error
//                   handling
//                 </li>
//                 <li>
//                   • <strong>TypeScript:</strong> Full type safety for all API
//                   calls
//                 </li>
//                 <li>
//                   • <strong>Cache invalidation:</strong> Related data updates
//                   when mutations complete
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
