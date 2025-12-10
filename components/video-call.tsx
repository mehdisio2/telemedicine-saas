"use client";

import { JitsiMeeting } from "@jitsi/react-sdk";
import { useRouter } from "next/navigation";
import { Video, Loader2 } from "lucide-react";

interface VideoCallProps {
    roomName: string;
    userDisplayName: string;
    userRole: "doctor" | "patient";
    returnPath?: string;
}

/**
 * VideoCall component wrapping Jitsi Meet SDK
 * Uses the free public meet.jit.si server
 * Styled to match the TeleMedCare theme
 */
export function VideoCall({
    roomName,
    userDisplayName,
    userRole,
    returnPath,
}: VideoCallProps) {
    const router = useRouter();

    // Prefix room name to avoid collisions
    const fullRoomName = `TeleMedCare_${roomName}`;

    const handleReadyToClose = () => {
        // Navigate back when user leaves the call
        if (returnPath) {
            router.push(returnPath);
        } else {
            router.back();
        }
    };

    return (
        <div className="fixed inset-0 bg-[#111111] flex flex-col">
            {/* Header Bar */}
            <header className="bg-gradient-to-r from-[#2AB3A3] to-[#1F8478] px-6 py-3 flex items-center justify-between shadow-lg z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Video className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-lg">TeleMedCare</h1>
                        <p className="text-white/80 text-sm">
                            Video Consultation • {userRole === "doctor" ? "Doctor" : "Patient"}
                        </p>
                    </div>
                </div>
                <div className="text-white/70 text-sm">
                    Room: <span className="font-mono text-white">{roomName}</span>
                </div>
            </header>

            {/* Video Container */}
            <div className="flex-1 relative">
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={fullRoomName}
                    configOverwrite={{
                        startWithAudioMuted: true,
                        startWithVideoMuted: false,
                        disableModeratorIndicator: false,
                        enableEmailInStats: false,
                        prejoinPageEnabled: true,
                        disableDeepLinking: true,
                        hideConferenceSubject: false,
                        hideConferenceTimer: false,
                        subject: "TeleMedCare Consultation",
                        // Disable end-of-meeting screens
                        enableClosePage: false,
                        disableFeedbackScreen: true,
                        disablePostMeetingScreen: true,
                        readOnlyName: true,
                        // Theming - Project teal colors
                        defaultRemoteDisplayName: "Participant",
                        // Custom theme with project colors
                        customTheme: {
                            palette: {
                                ui01: "#111111",      // Main background
                                ui02: "#1a1a1a",      // Secondary background
                                ui03: "#2AB3A3",      // Primary teal (borders, highlights)
                                ui04: "#1F8478",      // Dark teal
                                ui05: "#E6F9F0",      // Light teal
                                action01: "#2AB3A3",  // Primary action button (teal)
                                action01Hover: "#1F8478", // Primary hover
                                action02: "#1F8478",  // Secondary action
                                action02Hover: "#17635A", // Secondary hover
                                success01: "#4CAF50", // Success color
                                focus01: "#2AB3A3",   // Focus ring
                                text01: "#FFFFFF",    // Primary text
                                text02: "#E5E5E5",    // Secondary text
                                text03: "#888888",    // Muted text
                            },
                            typography: {
                                labelBold: {
                                    fontWeight: 600,
                                },
                            },
                        },
                        // Disable features not needed for telemedicine
                        toolbarButtons: [
                            "camera",
                            "chat",
                            "closedcaptions",
                            "desktop",
                            "filmstrip",
                            "fullscreen",
                            "hangup",
                            "microphone",
                            "participants-pane",
                            "raisehand",
                            "settings",
                            "tileview",
                            "toggle-camera",
                            "videoquality",
                        ],
                    }}
                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        SHOW_BRAND_WATERMARK: false,
                        SHOW_POWERED_BY: false,
                        TOOLBAR_ALWAYS_VISIBLE: true,
                        MOBILE_APP_PROMO: false,
                        SETTINGS_SECTIONS: ["devices", "language"],
                        VIDEO_LAYOUT_FIT: "both",
                        // Additional branding removal
                        DEFAULT_LOGO_URL: "",
                        DEFAULT_WELCOME_PAGE_LOGO_URL: "",
                        HIDE_INVITE_MORE_HEADER: true,
                        JITSI_WATERMARK_LINK: "",
                        BRAND_WATERMARK_LINK: "",
                    }}
                    userInfo={{
                        displayName: userDisplayName,
                        email: "", // Optional, not used but required by Jitsi types
                    }}
                    onReadyToClose={handleReadyToClose}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = "100%";
                        iframeRef.style.width = "100%";
                        iframeRef.style.border = "none";
                    }}
                    spinner={() => (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111111]">
                            <div className="p-4 bg-[#2AB3A3]/20 rounded-full mb-4">
                                <Loader2 className="w-12 h-12 text-[#2AB3A3] animate-spin" />
                            </div>
                            <p className="text-white text-lg font-medium">Connecting to consultation...</p>
                            <p className="text-white/60 text-sm mt-2">Please allow camera and microphone access when prompted</p>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
