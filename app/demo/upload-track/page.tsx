"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, Music, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function UploadTrackPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

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
      // Only accept audio files
      if (file.type.startsWith("audio/")) {
        newFiles.push(file)
        // Initialize progress for this file
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }))
      }
    }

    setFiles((prev) => [...prev, ...newFiles])
  }

  // Remove a file
  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName))
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[fileName]
      return newProgress
    })
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
          <h1 className="text-lg font-bold">Upload Tracks</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto">
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
            <input type="file" id="file-upload" multiple accept="audio/*" onChange={handleChange} className="hidden" />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Upload size={24} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload Audio Files</h3>
              <p className="text-zinc-400 mb-4">Drag and drop audio files here, or click to browse</p>
              <p className="text-xs text-zinc-500">Supported formats: MP3, WAV, FLAC, AAC (max 50MB)</p>
            </label>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Music size={18} className="text-purple-400" />
                Selected Files
              </h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.name} className="bg-zinc-700/50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center">
                        <Music size={16} />
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
                            className="h-full bg-purple-500"
                            style={{ width: `${uploadProgress[file.name] || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-zinc-400 ml-2">
                          {Math.round(uploadProgress[file.name] || 0)}%
                        </span>
                      </div>
                    ) : (
                      <button onClick={() => removeFile(file.name)} className="text-zinc-400 hover:text-white p-1">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Track details form */}
          {files.length > 0 && !uploading && (
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 mb-6">
              <h3 className="font-semibold mb-4">Track Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Project</label>
                  <select className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="dreamscape">Dreamscape</option>
                    <option value="midnight">Midnight Tapes</option>
                    <option value="new">Create New Project</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Track Type</label>
                    <select className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="master">Master</option>
                      <option value="stem">Stem</option>
                      <option value="demo">Demo</option>
                      <option value="reference">Reference</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                    <select className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="draft">Draft</option>
                      <option value="final">Final</option>
                      <option value="mastered">Mastered</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Notes (optional)</label>
                  <textarea
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                    placeholder="Add any notes about these tracks..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Upload complete message */}
          {uploading && Object.values(uploadProgress).every((p) => p >= 100) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center">
                <Check size={16} className="text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-green-400">Upload Complete</h4>
                <p className="text-sm text-green-300/80">All files have been successfully uploaded</p>
              </div>
            </motion.div>
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
