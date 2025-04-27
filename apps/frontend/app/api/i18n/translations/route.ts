import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Common translations from the common.json file
const commonTranslations = {
  en: {
    appName: 'RecruitX',
    settings: 'Settings',
    copyright: ' 2025 Shristyverse. RecruitX is a proprietary product of Shristyverse. All rights reserved.',
    language: 'Language',
    english: 'English',
    japanese: 'Japanese',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading',
    error: 'Error',
    success: 'Success'
  },
  ja: {
    appName: 'RecruitX',
    settings: '設定',
    copyright: ' 2025 Shristyverse。RecruitXはShristyverseの商用製品です。無断複写禁止。',
    language: '言語',
    english: '英語',
    japanese: '日本語',
    search: '検索',
    filter: 'フィルター',
    sort: '並べ替え',
    delete: '削除',
    edit: '編集',
    save: '保存',
    cancel: 'キャンセル',
    loading: '読み込み中',
    error: 'エラー',
    success: '成功'
  }
};

// Navigation translations
const navigationTranslations = {
  en: {
    dashboard: 'Dashboard',
    jobs: 'Jobs',
    candidates: 'Candidates',
    matches: 'Matches',
    reports: 'Reports',
    settings: 'Settings'
  },
  ja: {
    dashboard: 'ダッシュボード',
    jobs: '求人',
    candidates: '候補者',
    matches: 'マッチング',
    reports: 'レポート',
    settings: '設定'
  }
};

// Dashboard translations
const dashboardTranslations = {
  en: {
    title: 'Dashboard',
    openPositions: 'Open Positions',
    pendingMatches: 'Pending Matches',
    candidatesInPool: 'Candidates in Pool',
    averageMatchScore: 'Average Match Score',
    recentActivity: 'Recent Activity',
    recentMatches: 'Recent Matches',
    recentJobs: 'Recent Jobs',
    recentCandidates: 'Recent Candidates'
  },
  ja: {
    title: 'ダッシュボード',
    openPositions: '求人数',
    pendingMatches: '保留中のマッチング',
    candidatesInPool: '候補者プール数',
    averageMatchScore: '平均マッチングスコア',
    recentActivity: '最近のアクティビティ',
    recentMatches: '最近のマッチング',
    recentJobs: '最近の求人',
    recentCandidates: '最近の候補者'
  }
};

// Merge all translations
const translations = {
  en: {
    common: commonTranslations.en,
    navigation: navigationTranslations.en,
    dashboard: dashboardTranslations.en
  },
  ja: {
    common: commonTranslations.ja,
    navigation: navigationTranslations.ja,
    dashboard: dashboardTranslations.ja
  }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let lang = searchParams.get('language') || 'en';
  if (!['en', 'ja'].includes(lang)) lang = 'en';
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const fileJson = JSON.parse(raw);
    const base = translations[lang];
    const merged = {
      app: fileJson.app,
      nav: fileJson.nav,
      common: base.common,
      navigation: base.navigation,
      dashboard: { ...fileJson.dashboard, ...base.dashboard },
      jobs: fileJson.jobs,
      error: fileJson.error,
      candidates: fileJson.candidates,
      matches: fileJson.matches,
      reports: fileJson.reports,
      settings: fileJson.settings,
      actions: fileJson.actions,
      feedback: fileJson.feedback
    };
    return NextResponse.json({ translations: merged });
  } catch (err: any) {
    console.error('Error reading translation file:', err);
    return NextResponse.json({ translations: {}, error: err.message }, { status: 500 });
  }
}