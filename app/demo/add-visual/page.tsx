"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ImageIcon, Video, X, AlertCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type VisualType = "image" | "video"

export default function AddVisualPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [visualType, setVisualType] = useState<VisualType>("image")

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  // Process the files
  const handleFiles = (fileList: FileList) => {
    const newFiles: File[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      // Check file type based on selected visual type
      if (
        (visualType === "image" && file.type.startsWith("image/")) ||
        (visualType === "video" && file.type.startsWith("video/"))
      ) {
        newFiles.push(file)
        // Initialize progress for this file
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }))
      }
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  // Simulate upload process
  const uploadFiles = () => {
    if (files.length === 0) return

    setUploading(true)

    // Simulate progress for each file
    files.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)

          // Check if all files are done
          const allDone = Object.values(uploadProgress).every((p) => p >= 100)
          if (allDone) {
            setTimeout(() => {
              setUploading(false)
            }, 500)
          }
        }

        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: progress,
        }))
      }, 300)
    })
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/demo"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-lg font-bold">Add Visual</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
          {/* Visual type selector */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 mb-6">
            <h3 className="font-semibold mb-4">Visual Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-4 rounded-lg flex flex-col items-center justify-center border ${
                  visualType === "image" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500"
                }`}
                onClick={() => setVisualType("image")}
              >
                <ImageIcon size={24} className={visualType === "image" ? "text-blue-400" : "text-zinc-400"} />
                <span className="mt-2 font-medium">Image</span>
                <span className="text-xs text-zinc-400 mt-1">JPG, PNG, GIF</span>
              </button>
              <button
                className={`p-4 rounded-lg flex flex-col items-center justify-center border ${
                  visualType === "video" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500"
                }`}
                onClick={() => setVisualType("video")}
              >
                <Video size={24} className={visualType === "video" ? "text-blue-400" : "text-zinc-400"} />
                <span className="mt-2 font-medium">Video</span>
                <span className="text-xs text-zinc-400 mt-1">MP4, MOV, WebM</span>
              </button>
            </div>
          </div>

          {/* Upload area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${
              dragActive ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              accept={visualType === "image" ? "image/*" : "video/*"}
              onChange={handleChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Upload size={24} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload {visualType === "image" ? "Images" : "Videos"}</h3>
              <p className="text-zinc-400 mb-4">
                Drag and drop {visualType === "image" ? "images" : "videos"} here, or click to browse
              </p>
              <p className="text-xs text-zinc-500">
                {visualType === "image"
                  ? "Supported formats: JPG, PNG, GIF (max 10MB)"
                  : "Supported formats: MP4, MOV, WebM (max 100MB)"}
              </p>
            </label>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                {visualType === "image" ? (
                  <ImageIcon size={18} className="text-blue-400" />
                ) : (
                  <Video size={18} className="text-blue-400" />
                )}
                Selected Files
              </h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.name} className="bg-zinc-700/50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                        {visualType === "image" ? <ImageIcon size={16} /> : <Video size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-zinc-400">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    {uploading ? (
                      <div className="w-24 flex items-center">
                        <div className="flex-1 h-1.5 bg-zinc-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-zinc-400 ml-2">
                          {Math.round(uploadProgress[file.name] || 0)}%
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setFiles(files.filter((f) => f.name !== file.name))
                          setUploadProgress((prev) => {
                            const newProgress = { ...prev }
                            delete newProgress[file.name]
                            return newProgress
                          })
                        }}
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visual details form */}
          {files.length > 0 && !uploading && (
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 mb-6">
              <h3 className="font-semibold mb-4">Visual Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Project</label>
                  <select className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="dreamscape">Dreamscape</option>
                    <option value="summer">Summer Visuals</option>
                    <option value="new">Create New Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={visualType === "image" ? "Cover Art Concept" : "Music Video"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Description (optional)</label>
                  <textarea
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                    placeholder="Add a description..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Tags (optional)</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="concept, artwork, promo"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>
          )}

          {/* Warning message */}
          {files.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                <AlertCircle size={16} className="text-amber-400" />
              </div>
              <div>
                <h4 className="font-medium text-amber-400">Important Note</h4>
                <p className="text-sm text-amber-300/80">This is a demo version. No actual files will be uploaded.</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-500"
              disabled={files.length === 0 || uploading}
              onClick={uploadFiles}
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
