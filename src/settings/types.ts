export enum SideBarItemAction {
  OpenInCurrentTab = 'open',
  OpenInNewTab = 'newtab',
  ToggleExpansion = 'toggle',
}

export enum SidebarPadding {
  Compact = '2px 4px',
  Default = '4px 12px',
  Relaxed = '6px 12px',
  VeryRelaxed = '8px 12px',
}

export interface SettingsObject {
  sidebarNoteItemNameAction: SideBarItemAction;
  sidebarNoteItemBackgroundAction: SideBarItemAction;
  sidebarNoteItemMiddleClickAction: SideBarItemAction;
  sidebarMediaItemNameAction: SideBarItemAction;
  sidebarMediaItemBackgroundAction: SideBarItemAction;
  sidebarMediaItemMiddleClickAction: SideBarItemAction;
  sidebarCollectionItemNameAction: SideBarItemAction;
  sidebarCollectionItemBackgroundAction: SideBarItemAction;
  sidebarCollectionItemMiddleClickAction: SideBarItemAction;
  sidebarNumberOfUntruncatedItems: number;
  sidebarOffsetPerLevel: number;
  sidebarShowStarredItems: boolean;
  sidebarShowStarredItemsCount: number;
  sidebarShowRecentItems: boolean;
  sidebarShowRecentItemsCount: number;
  sidebarItemPadding: string;
  noteItemSaveDelay: number;
  noteItemMaximumSaveInterval: number;
  autoBackupActive: boolean;
  autoBackupIncludeMedia: boolean;
  autoBackupCount: number;
  autoBackupInterval: number;
  autoBackupLocation: string;
  autoUpdateAppActive: boolean;
  autoUpdateAppBackupActive: boolean;
  editorMonacoMinimap: boolean;
  editorMonacoTheme: string;
  editorMonacoRenderControlChars: boolean;
  editorMonacoRenderWhitespace: string;
  editorMonacoRuler: number | undefined;
  editorMonacoTabSize: number;
  editorMonacoWordWrap: string;
  editorMonacoSemanticChecking: boolean;
  editorMonacoSyntacticChecking: boolean;
  editorAtlassianAdvancedTables: boolean;
  editorShowSaveIndicator: boolean;
  devToolsOpen: boolean;
  devLoggerWhitelist: string;
  devLoggerBlacklist: string;
  devLoggerActive: boolean;
  themePrimaryColor: string;
  themeSidebarColor: string;
  themeSidebarHoverColor: string;
  themeSidebarTextColor: string;
  themeTopbarColor: string;
  telemetry: boolean;
  zoomFactor: number;
  completedSpotlights: string[];
  pageHeaderCollapsed: boolean;
  spellingActive: boolean;
  spellingLanguages: string[];
  notifications: Array<{ id: string; seenDate: number; dismissed: boolean; seenCount?: number }>;
  campaigns: boolean;
}
