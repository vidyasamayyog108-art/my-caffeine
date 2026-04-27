import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "types/common";
import Types "types/matrimony-core";
import MessagingTypes "types/messaging";
import ChatbotTypes "types/chatbot";
import AdsTypes "types/ads";
import Lib "lib/matrimony-core";
import { migration } "lib/migration";
import MatrimonyCoreApi "mixins/matrimony-core-api";
import MessagingApi "mixins/messaging-api";
import ChatbotApi "mixins/chatbot-api";
import KundaliApi "mixins/kundali-api";
import AdsApi "mixins/ads-api";

(with migration)
actor {
  // ── State ──────────────────────────────────────────────────────────
  let members = List.empty<Types.MemberInternal>();
  let stories = List.empty<Types.SuccessStoryInternal>();
  let announcements = List.empty<Types.AnnouncementInternal>();
  let otpStore = List.empty<Types.MobileOtp>();
  let messages = List.empty<MessagingTypes.MessageInternal>();
  let conversations = List.empty<MessagingTypes.ConversationInternal>();
  let chatMessages = List.empty<ChatbotTypes.ChatMessage>();
  let smsConfigHolder : { var config : ?MessagingTypes.SmsConfig } = { var config = null };
  // OTP rate-limit tracker: list of (mobile, requestCount, timestamp) tuples
  let otpRateLimitsHolder : { var data : [(Text, Nat, Int)] } = { var data = [] };
  // SMS OTP send log — for admin audit trail
  let smsOtpLog = List.empty<MessagingTypes.SmsOtpLogEntry>();
  // Chat message ID counter — separate from main AppState to avoid migration
  let chatIdHolder : Common.ChatIdHolder = { var nextChatMessageId = 0 };
  // Payment configuration — UPI ID and QR code image for the payment page
  let paymentConfig : Common.PaymentConfig = {
    var upiId = "vivahsetu@ptaxis";
    var qrImageUrl = "";
    var qrImageAssetId = "";
    var updatedAt = 0;
  };
  // ── Advertisements state ───────────────────────────────────────────
  let ads = List.empty<AdsTypes.AdInternal>();
  let adIdHolder : AdsTypes.AdIdHolder = { var nextAdId = 0 };

  // Admin credentials with default username/password (change via adminUpdateCredentials)
  let adminCreds : Common.AdminCredentials = {
    var username = "admin";
    var passwordHash = "hashed_admin123";   // MVP: "hashed_" prefix convention; default password = admin123
    var adminMobile = "9999999999";         // update via adminUpdateCredentials
    var failedAttempts = 0;
    var lockUntil = null;
  };
  let state : Common.AppState = {
    var nextMemberId = 0;
    var nextStoryId = 0;
    var nextAnnouncementId = 0;
    var nextMessageId = 0;
    var adminPrincipal = Principal.anonymous();
  };

  // ── Seed sample data on first run ──────────────────────────────────
  Lib.seedSampleData(members, stories, announcements, state);

  // ── Mixin composition ──────────────────────────────────────────────
  include MatrimonyCoreApi(
    members,
    stories,
    announcements,
    otpStore,
    state,
    smsConfigHolder,
    otpRateLimitsHolder,
    adminCreds,
    paymentConfig,
    smsOtpLog,
  );

  include MessagingApi(
    messages,
    conversations,
    members,
    smsConfigHolder,
    smsOtpLog,
    state,
  );

  include ChatbotApi(
    chatMessages,
    members,
    state,
    chatIdHolder,
  );

  include KundaliApi(
    state,
    members,
  );

  include AdsApi(
    ads,
    adIdHolder,
  );
};
