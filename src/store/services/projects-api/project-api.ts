import { db } from "@/lib/firebase";
import { format } from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { baseApi } from "../baseApi";
import { PROJECTS } from "../tags";

export type ProjectFormData = {
  projectName: string;
  projectCode: string;
  projectIcon: string;
};

// Projects API endpoints
export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch projects for a specific user
    fetchProjects: builder.query<any, string>({
      queryFn: async (userId) => {
        try {
          const projectsRef = collection(db, "projects");
          const q = query(
            projectsRef,
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);

          const projects: any[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Ensure all data is properly serialized
            const serializedProject = {
              id: doc.id,
              projectName: data.projectName || "",
              projectCode: data.projectCode || "",
              projectIcon: data.projectIcon || "",
              userId: data.userId || "",
              createdAt: format(data.createdAt.toDate(), "dd MMM yyyy"),
            };

            projects.push(serializedProject);
          });

          return { data: projects };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
      providesTags: [PROJECTS],
    }),

    // Add a new project
    addProject: builder.mutation<string, any>({
      queryFn: async (projectData) => {
        try {
          const docRef = await addDoc(collection(db, "projects"), {
            ...projectData,
            createdAt: new Date(),
          });
          return { data: docRef.id };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: [PROJECTS],
    }),

    // Delete a project
    deleteProject: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      queryFn: async (projectId) => {
        try {
          const projectRef = doc(db, "projects", projectId);
          await deleteDoc(projectRef);
          return {
            data: { success: true, message: "Project deleted successfully" },
          };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: [PROJECTS],
    }),

    // Update an existing project
    updateProject: builder.mutation<
      { success: boolean; message: string },
      { projectId: string; projectData: Partial<ProjectFormData> }
    >({
      queryFn: async ({ projectId, projectData }) => {
        try {
          const projectRef = doc(db, "projects", projectId);
          await updateDoc(projectRef, {
            ...projectData,
            updatedAt: new Date(), // Track when the project was last updated
          });
          return {
            data: { success: true, message: "Project updated successfully" },
          };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: [PROJECTS],
    }),

    // Fetch a single project's basic info by projectId
    fetchProjectById: builder.query<
      { projectName: string; projectCode: string; projectIcon: string } | null,
      string
    >({
      queryFn: async (projectId) => {
        try {
          const projectRef = doc(db, "projects", projectId);
          const projectSnap = await getDoc(projectRef);
          if (!projectSnap.exists()) {
            return { data: null };
          }
          const data = projectSnap.data();
          return {
            data: {
              projectName: data.projectName || "",
              projectCode: data.projectCode || "",
              projectIcon: data.projectIcon || "",
            },
          };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: String(error) } };
        }
      },
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useLazyFetchProjectByIdQuery,
  useFetchProjectByIdQuery,
} = projectApi;
