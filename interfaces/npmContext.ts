export interface NpmContext {
  context: Context;
  chunks: { [key: string]: string[] };
  hash: string;
  name: string;
  containerId: string;
  headerName: string;
  publicPath: string;
}

interface Context {
  activeTab: string;
  notifications: any[];
  csrftoken: string;
  userEmailVerified: null;
  auditLogEnabled: boolean;
  user: null;
  documentContext: DocumentContext;
  undefined: boolean;
  readme: Readme;
  versionsDownloads: { [key: string]: number };
  starAction: string;
  provenance: Provenance;
  isSecurityPlaceholder: boolean;
  private: boolean;
  packument: Pack;
  packageVersion: Pack;
  packageUrl: string;
  packageLinkingCallToActionHref: null;
  package: string;
  linkingAllowedForPackage: boolean;
  isStarred: boolean;
  ghapi: string;
  downloads: Download[];
  dependents: Dependents;
  capsule: Capsule;
  canEditPackage: boolean;
}

interface Capsule {
  name: string;
  description: string;
  maintainers: string[];
  'dist-tags': DistTags;
  lastPublish: LastPublish;
  types: Types;
}

interface DistTags {
  previous: string;
  classic: string;
  pre: string;
  latest: string;
  nightly: string;
  experimental: string;
}

interface LastPublish {
  maintainer: string;
  time: string;
}

interface Types {
  typescript: Typescript;
}

interface Typescript {
  bundled: string;
  package: string;
}

interface Dependents {
  dependentsCount: number;
  dependentsTruncated: string[];
}

interface DocumentContext {
  'readme.data': string;
}

interface Download {
  downloads: number;
  label: string;
}

interface Pack {
  author: Author;
  description: string;
  homepage: string;
  repository: string;
  keywords: string[];
  dependencies?: Dependencies;
  devDependencies?: DevDependencies;
  maintainers: Author[];
  name: string;
  license: string;
  version: string;
  versions: Version[];
  deprecations: string[];
  types?: string;
  distTags?: DistTags;
}

interface Author {
  name: string;
  avatars: Avatars;
}

interface Avatars {
  small: string;
  medium: string;
  large: string;
}

interface Dependencies {
  '@remix-run/router': string;
}

interface DevDependencies {
  react: string;
  'react-router-dom': string;
}

interface Version {
  version: string;
  date: DateClass;
  dist: Dist;
  deprecated?: string;
}

interface DateClass {
  ts: number;
  rel: string;
}

interface Dist {
  integrity: string;
  shasum: string;
  tarball: string;
  fileCount?: number;
  unpackedSize?: number;
  signatures: Signature[];
  'npm-signature'?: string;
}

interface Signature {
  keyid: string;
  sig: string;
}

interface Provenance {
  enabled: boolean;
  feedbackUrl: string;
}

interface Readme {
  ref: string;
  data: null;
}
