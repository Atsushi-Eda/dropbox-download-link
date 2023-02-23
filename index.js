#!/usr/bin/env node

import { Dropbox } from 'dropbox';
import clipboardy from 'clipboardy';

try {
  const dropbox = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  });
  const path = process.argv[2];

  const {
    result: { url: rawUrl },
  } = await dropbox.sharingCreateSharedLink({ path });
  const url = rawUrl
    .replace('www.dropbox', 'dl.dropboxusercontent')
    .replace('?dl=0', '');

  clipboardy.write(url);
  console.log(url);
} catch (error) {
  console.error(error);
}
