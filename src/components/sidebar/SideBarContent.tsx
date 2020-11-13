import * as React from 'react';
import { useEffect } from 'react';
import { WorkSpaceSelection } from './WorkSpaceSelection';
import { SearchQuerySortColumn, SearchQuerySortDirection } from '../../types';
import { useDataSearch } from '../../datasource/useDataSearch';
import { InternalTag } from '../../datasource/InternalTag';
import { SideBarTreeOnIds } from './SideBarTreeOnIds';
import { NavigationTree } from './NavigationTree';
import { useSettings } from '../../appdata/AppDataProvider';
import { SideBarTreeOnSearchQuery } from './SideBarTreeOnSearchQuery';

export const SideBarContent: React.FC<{}> = props => {
  const searchResult = useDataSearch({ tags: [InternalTag.WorkspaceRoot], limit: 1 });
  const rootCollection = searchResult.items[0];
  const { items: rootChilds } = useDataSearch(rootCollection ? { parents: [rootCollection.id] } : {});
  const settings = useSettings();

  return (
    <>
      <WorkSpaceSelection />

      <NavigationTree />

      { settings.sidebarShowRecentItems && (
        <SideBarTreeOnSearchQuery
          search={{
            sortColumn: SearchQuerySortColumn.LastChange,
            sortDirection: SearchQuerySortDirection.Descending,
            limit: settings.sidebarShowRecentItemsCount
          }}
          title="Recent Items"
        />
      ) }

      { settings.sidebarShowStarredItems && (
        <SideBarTreeOnSearchQuery
          search={{
            sortColumn: SearchQuerySortColumn.LastChange,
            sortDirection: SearchQuerySortDirection.Descending,
            tags: [InternalTag.Starred],
            limit: settings.sidebarShowStarredItemsCount
          }}
          title="Starred Items"
        />
      ) }

      {
        rootChilds.map(rootChild => (
          <SideBarTreeOnIds
            key={rootChild.id}
            title={rootChild.name}
            rootItems={rootChild.childIds}
            masterItem={rootChild}
          />
        ))
      }
    </>
  );
};
