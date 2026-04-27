import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MemberAdminSummary {
    id: MemberId;
    paymentStatus: PaymentStatus;
    owner: Principal;
    city: string;
    name: string;
    createdAt: Timestamp;
    hasPhoto: boolean;
    photoModerationStatus: PhotoModerationStatus;
    isProfileComplete: boolean;
    isActive: boolean;
    isVerified: boolean;
    gender: Gender;
    membership: MembershipTier;
}
export type Timestamp = bigint;
export interface SmsConfig {
    provider: SmsProvider;
    templateId?: string;
    enabled: boolean;
    apiKey: string;
    senderName: string;
}
export interface PhotoModerationInfo {
    memberId: MemberId;
    photoModerationStatus: PhotoModerationStatus;
    memberName: string;
    photoAssetId: string;
}
export interface SmsOtpLogEntry {
    provider: string;
    errorCode?: string;
    timestamp: Timestamp;
    success: boolean;
    phone: string;
}
export interface Stats {
    successfulMarriages: bigint;
    premiumMembers: bigint;
    totalMembers: bigint;
    activeMembers: bigint;
}
export interface AshtakootResult {
    total: bigint;
    varna: bigint;
    gana: bigint;
    nadi: bigint;
    tara: bigint;
    grahaMaitri: bigint;
    yoni: bigint;
    vashya: bigint;
    bhakoot: bigint;
}
export interface SuccessStoryInput {
    featured: boolean;
    marriageDate: string;
    photoUrl: string;
    brideName: string;
    groomName: string;
    testimonial: string;
}
export interface AdLangText {
    en: string;
    hi: string;
    kn: string;
    mr: string;
}
export interface UpdateAdInput {
    id: AdId;
    websiteLink: string;
    endDate: Timestamp;
    imageAssetId: string;
    langText: AdLangText;
    isActive: boolean;
    imageUrl: string;
    adText: string;
    adType: AdType;
    companyName: string;
    contactNumber: string;
    startDate: Timestamp;
}
export interface Announcement {
    id: AnnouncementId;
    title: string;
    content: string;
    createdAt: Timestamp;
    isActive: boolean;
    author: string;
    updatedAt: Timestamp;
}
export interface PaymentConfigPublic {
    qrImageUrl: string;
    updatedAt: Timestamp;
    upiId: string;
    qrImageAssetId: string;
}
export interface KundaliResult {
    nakshatra1Name: string;
    verdict: string;
    score: AshtakootResult;
    nakshatra2Name: string;
    rashi1: bigint;
    rashi2: bigint;
    charan1: bigint;
    charan2: bigint;
    nakshatra1: bigint;
    nakshatra2: bigint;
}
export interface ConversationSummary {
    otherMemberName: string;
    otherMemberId: MemberId;
    lastMessageAt: Timestamp;
    lastMessage: string;
    unreadCount: bigint;
}
export interface ChatMessage {
    id: ChatMessageId;
    userId?: MemberId;
    createdAt: Timestamp;
    language: string;
    message: string;
    sessionId: string;
    isBot: boolean;
}
export type AdId = bigint;
export interface SuccessStory {
    id: StoryId;
    featured: boolean;
    marriageDate: string;
    createdAt: Timestamp;
    photoUrl: string;
    updatedAt: Timestamp;
    brideName: string;
    groomName: string;
    testimonial: string;
}
export interface CreateAdInput {
    websiteLink: string;
    endDate: Timestamp;
    imageAssetId: string;
    langText: AdLangText;
    imageUrl: string;
    adText: string;
    adType: AdType;
    companyName: string;
    contactNumber: string;
    startDate: Timestamp;
}
export type ChatMessageId = bigint;
export interface SearchFilter {
    occupation?: string;
    city?: string;
    education?: string;
    minAge?: bigint;
    upjati?: string;
    gender?: Gender;
    maxAge?: bigint;
    maxIncome?: bigint;
    minIncome?: bigint;
}
export type StoryId = bigint;
export type MemberId = bigint;
export interface NakshatraData {
    charan: bigint;
    nakshatra: bigint;
    rashi: bigint;
    moonLongitude: number;
}
export interface ChatConversationSummary {
    userId?: MemberId;
    lastActivity: Timestamp;
    messageCount: bigint;
    sessionId: string;
    firstMessage: string;
}
export interface MemberInput {
    age: bigint;
    occupation: string;
    familyType: FamilyType;
    nativePlace: string;
    heightCm: bigint;
    birthTime?: string;
    dateOfBirth: string;
    city: string;
    motherOccupation: string;
    name: string;
    annualIncomeINR: bigint;
    education: string;
    birthPlaceLat?: number;
    birthPlaceLng?: number;
    birthPlace?: string;
    mobileNumber?: string;
    photoUrl: string;
    siblingsCount: bigint;
    upjati?: string;
    gender: Gender;
    partnerPreferences: PartnerPreferences;
    fatherOccupation: string;
}
export interface PartnerPreferences {
    maxHeight?: bigint;
    preferredOccupation: Array<string>;
    minAge?: bigint;
    preferredEducation: Array<string>;
    minHeight?: bigint;
    preferredUpjati: Array<string>;
    maxAge?: bigint;
    maxIncome?: bigint;
    preferredLocations: Array<string>;
    minIncome?: bigint;
}
export type MessageId = bigint;
export interface AnnouncementInput {
    title: string;
    content: string;
    author: string;
}
export interface Message {
    id: MessageId;
    isDeleted: boolean;
    content: string;
    createdAt: Timestamp;
    isRead: boolean;
    receiverId: MemberId;
    senderId: MemberId;
}
export interface Member {
    id: MemberId;
    age: bigint;
    occupation: string;
    familyType: FamilyType;
    paymentStatus: PaymentStatus;
    nativePlace: string;
    heightCm: bigint;
    birthTime?: string;
    owner: Principal;
    dateOfBirth: string;
    city: string;
    motherOccupation: string;
    name: string;
    annualIncomeINR: bigint;
    createdAt: Timestamp;
    education: string;
    birthPlaceLat?: number;
    birthPlaceLng?: number;
    photoModerationStatus: PhotoModerationStatus;
    birthPlace?: string;
    mobileNumber?: string;
    photoUrl: string;
    siblingsCount: bigint;
    isActive: boolean;
    updatedAt: Timestamp;
    upjati?: string;
    paymentScreenshotUrl?: string;
    isVerified: boolean;
    paymentUpiRef?: string;
    gender: Gender;
    partnerPreferences: PartnerPreferences;
    fatherOccupation: string;
    membership: MembershipTier;
    charan?: bigint;
    profileViews: bigint;
    nakshatra?: bigint;
    rashi?: bigint;
    photoAssetId?: string;
}
export type AnnouncementId = bigint;
export interface Ad {
    id: AdId;
    websiteLink: string;
    clicks: bigint;
    endDate: Timestamp;
    imageAssetId: string;
    views: bigint;
    createdAt: Timestamp;
    langText: AdLangText;
    isActive: boolean;
    updatedAt: Timestamp;
    imageUrl: string;
    adText: string;
    adType: AdType;
    companyName: string;
    contactNumber: string;
    startDate: Timestamp;
}
export enum AdType {
    both = "both",
    text = "text",
    image = "image"
}
export enum FamilyType {
    Extended = "Extended",
    Nuclear = "Nuclear",
    Joint = "Joint"
}
export enum Gender {
    Male = "Male",
    Female = "Female"
}
export enum MembershipTier {
    Premium = "Premium",
    Free = "Free"
}
export enum PaymentStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Uploaded = "Uploaded",
    Pending = "Pending"
}
export enum PhotoModerationStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export enum SmsProvider {
    Fast2SMS = "Fast2SMS",
    Custom = "Custom",
    MSG91 = "MSG91"
}
export enum Variant_ok_expired_invalid {
    ok = "ok",
    expired = "expired",
    invalid = "invalid"
}
export interface backendInterface {
    adminApproveMember(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminApprovePayment(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminApproveProfilePhoto(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminBlockMember(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateAd(input: CreateAdInput): Promise<Ad>;
    adminCreateAnnouncement(input: AnnouncementInput): Promise<AnnouncementId>;
    adminCreateSuccessStory(input: SuccessStoryInput): Promise<StoryId>;
    adminDeleteAd(id: AdId): Promise<boolean>;
    adminDeleteAnnouncement(id: AnnouncementId): Promise<boolean>;
    adminDeleteMember(id: MemberId): Promise<boolean>;
    adminDeleteMemberPhoto(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteMessage(messageId: MessageId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteProfile(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteSuccessStory(id: StoryId): Promise<boolean>;
    adminGetAllChatConversations(cursor: bigint, limit: bigint): Promise<{
        total: bigint;
        conversations: Array<ChatConversationSummary>;
    }>;
    adminGetChatSession(sessionId: string): Promise<Array<ChatMessage>>;
    adminGetConversation(memberId1: MemberId, memberId2: MemberId, offset: bigint, limit: bigint): Promise<Array<Message>>;
    adminGetCredentialInfo(): Promise<{
        adminMobile: string;
        username: string;
        isLocked: boolean;
    }>;
    adminGetPaymentConfig(): Promise<PaymentConfigPublic>;
    adminGetSmsConfig(): Promise<SmsConfig | null>;
    adminGetSmsOtpLogs(): Promise<Array<SmsOtpLogEntry>>;
    adminGetStats(): Promise<Stats>;
    adminListAllAds(): Promise<Array<Ad>>;
    adminListAllMembers(): Promise<Array<Member>>;
    adminListAllPhotos(): Promise<Array<PhotoModerationInfo>>;
    adminLogin_Step1_CheckPassword(username: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "invalid";
        invalid: null;
    } | {
        __kind__: "locked";
        locked: string;
    }>;
    adminLogin_Step2_VerifyOtp(username: string, otp: string): Promise<Variant_ok_expired_invalid>;
    adminMuteConversation(memberId1: MemberId, memberId2: MemberId, muted: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminRejectMember(memberId: MemberId, _reason: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminRejectPayment(memberId: MemberId, _reason: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminRejectProfilePhoto(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminSearchMembers(query: string): Promise<Array<Member>>;
    adminSetAdmin(newAdmin: Principal): Promise<boolean>;
    adminSetMemberActive(id: MemberId, active: boolean): Promise<boolean>;
    adminSetPaymentConfig(upiId: string, qrImageUrl: string, qrImageAssetId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminSetSmsConfig(config: SmsConfig): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminTestSms(mobile: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminToggleAdActive(id: AdId): Promise<Ad | null>;
    adminUnverifyProfile(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateAd(input: UpdateAdInput): Promise<Ad | null>;
    adminUpdateAnnouncement(id: AnnouncementId, input: AnnouncementInput): Promise<boolean>;
    adminUpdateCredentials(newPassword: string | null, newMobile: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateSuccessStory(id: StoryId, input: SuccessStoryInput): Promise<boolean>;
    adminVerifyProfile(memberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    computeKundaliMilan(dob1: string, dob2: string): Promise<KundaliResult | null>;
    computeKundaliScore(dob1: string, dob2: string, birthTime1: string | null, birthTime2: string | null, birthLat1: number | null, birthLng1: number | null, birthLat2: number | null, birthLng2: number | null): Promise<KundaliResult | null>;
    computePreciseNakshatra(date: string, time: string, lat: number, lng: number): Promise<NakshatraData | null>;
    createProfile(input: MemberInput): Promise<MemberId>;
    deleteProfile(): Promise<boolean>;
    getActiveAds(): Promise<Array<Ad>>;
    getAnnouncement(id: AnnouncementId): Promise<Announcement | null>;
    getChatGreeting(language: string): Promise<string>;
    getChatHistory(sessionId: string): Promise<Array<ChatMessage>>;
    getConversation(otherMemberId: MemberId, offset: bigint, limit: bigint): Promise<Array<Message>>;
    getDailyMessageCount(): Promise<bigint>;
    getMemberProfile(id: MemberId): Promise<Member | null>;
    getMyConversations(): Promise<Array<ConversationSummary>>;
    getMyMatches(): Promise<Array<Member>>;
    getMyProfile(): Promise<Member | null>;
    getNakshatraForDob(dob: string): Promise<bigint | null>;
    getNakshatraName(index: bigint): Promise<string>;
    getNearbyMatches(): Promise<Array<Member>>;
    getProfilePhotoUploadUrl(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getStats(): Promise<Stats>;
    getSuccessStory(id: StoryId): Promise<SuccessStory | null>;
    getTodaysMatches(): Promise<Array<Member>>;
    listAllMembers(): Promise<Array<MemberAdminSummary>>;
    listAnnouncements(): Promise<Array<Announcement>>;
    listFeaturedStories(): Promise<Array<SuccessStory>>;
    listPendingPayments(): Promise<Array<Member>>;
    listPremiumProfiles(): Promise<Array<Member>>;
    listProfiles(offset: bigint, limit: bigint): Promise<Array<Member>>;
    listSuccessStories(): Promise<Array<SuccessStory>>;
    markAsRead(fromMemberId: MemberId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    recordAdClick(id: AdId): Promise<void>;
    recordAdView(id: AdId): Promise<void>;
    searchProfiles(filter: SearchFilter): Promise<Array<Member>>;
    sendChatMessage(sessionId: string, message: string, language: string): Promise<string>;
    sendMessage(receiverMemberId: MemberId, content: string): Promise<{
        __kind__: "ok";
        ok: MessageId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    sendOtp(mobile: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitPaymentScreenshot(screenshotUrl: string, upiRef: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateMemberNakshatra(): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePaymentStatus(memberId: MemberId, status: PaymentStatus): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProfile(input: MemberInput): Promise<boolean>;
    updateProfilePhoto(assetId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    upgradeToPremium(): Promise<boolean>;
    verifyOtp(mobile: string, otp: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
