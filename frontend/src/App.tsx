import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { CompletedTaskList } from "./components/CompletedTaskList";
import { useState } from "react";
import { FaClipboardList, FaTasks, FaList, FaTrophy } from "react-icons/fa";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"recent" | "completed">("recent");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskChange = () => {
    // Force refresh of both TaskList and CompletedTaskList
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Modern Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              {/* Clean Logo Section */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="relative group">
                  <div className="bg-blue-600 rounded-2xl p-3 sm:p-4 shadow-lg transform transition-all duration-300">
                    <FaClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Clean Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
                TaskMaster
              </h1>

              {/* Clean Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                Organize your tasks, boost your productivity, and achieve your
                goals with our intuitive task management platform.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4">
                <div className="flex items-center bg-blue-50 px-3 sm:px-4 py-2 rounded-full border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                  <span className="text-xs sm:text-sm font-medium text-blue-700">
                    Real-time sync
                  </span>
                </div>
                <div className="flex items-center bg-emerald-50 px-3 sm:px-4 py-2 rounded-full border border-emerald-200">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 sm:mr-3"></div>
                  <span className="text-xs sm:text-sm font-medium text-emerald-700">
                    Smart organization
                  </span>
                </div>
                <div className="flex items-center bg-purple-50 px-3 sm:px-4 py-2 rounded-full border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 sm:mr-3"></div>
                  <span className="text-xs sm:text-sm font-medium text-purple-700">
                    Progress tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Two Column Layout with Fixed Widths */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left Column - Task Form */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-sm">
                    <FaClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                      Create New Task
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600">
                      Add a new task to your list
                    </p>
                  </div>
                </div>
              </div>
              <TaskForm onTaskCreated={handleTaskChange} />
            </div>

            {/* Right Column - Tasks with Tabs */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-sm">
                    <FaTasks className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                      Task Management
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600">
                      Manage your tasks efficiently
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-4 sm:mb-6 overflow-hidden">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("recent")}
                    className={`flex-1 flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 relative text-sm sm:text-base ${
                      activeTab === "recent"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <FaList className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline sm:inline">
                      Active Tasks
                    </span>
                    <span className="xs:hidden sm:hidden">Active</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`flex-1 flex items-center justify-center px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 relative text-sm sm:text-base ${
                      activeTab === "completed"
                        ? "bg-emerald-600 text-white"
                        : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <FaTrophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline sm:inline">
                      Completed
                    </span>
                    <span className="xs:hidden sm:hidden">Done</span>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px] sm:min-h-[500px] w-[100%]">
                {activeTab === "recent" ? (
                  <div className="animate-tab-transition opacity-100 translate-x-0">
                    <TaskList
                      key={refreshKey}
                      onTaskCompleted={handleTaskChange}
                    />
                  </div>
                ) : (
                  <div className="animate-tab-transition opacity-100 translate-x-0">
                    <CompletedTaskList key={refreshKey} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <FaClipboardList className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
              <p className="text-sm sm:text-base text-slate-600">
                Made by{" "}
                <span className="font-semibold text-slate-900">
                  Vishani Raveendran
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
