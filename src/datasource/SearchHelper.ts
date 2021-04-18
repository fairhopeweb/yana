import { DataItem, SearchQuery, SearchQuerySortColumn, SearchQuerySortDirection } from '../types';
import { AbstractDataSource } from './AbstractDataSource';
import { doArraysIntersect } from '../utils';

export class SearchHelper {
  public static async satisfiesSearch(item: DataItem<any>, search: SearchQuery, dataSource: AbstractDataSource) {
    if (search.kind && search.kind !== item.kind) {
      return false;
    }

    if (search.childs && !doArraysIntersect(search.childs, item.childIds)) {
      return false;
    }

    if (search.exactParents || search.parents) {
      const parents = (await dataSource.getParentsOf(item.id)).map(parent => parent.id);
      if (search.parents && !doArraysIntersect(search.parents, parents)) {
        return false;
      }

      if (
        search.exactParents &&
        (parents.length !== search.exactParents.length ||
          !search.exactParents.map(p => parents.includes(p)).reduce((a, b) => a && b, true))
      ) {
        return false;
      }
    }

    if (search.tags && !search.tags.map(t => item.tags.includes(t)).reduce((a, b) => a && b, true)) {
      return false;
    }

    if (search.notTags && !search.notTags.map(t => !item.tags.includes(t)).reduce((a, b) => a && b, true)) {
      return false;
    }

    if (
      search.contains &&
      !search.contains.map(c => item.name.toLowerCase().includes(c.toLowerCase())).reduce((a, b) => a || b, false)
    ) {
      return false;
    }

    return true;
  }

  public static sortItems(
    itemA: DataItem,
    itemB: DataItem,
    column: SearchQuerySortColumn,
    direction: SearchQuerySortDirection = SearchQuerySortDirection.Ascending
  ) {
    const a = direction === SearchQuerySortDirection.Ascending ? itemA : itemB;
    const b = direction === SearchQuerySortDirection.Ascending ? itemB : itemA;

    switch (column) {
      case SearchQuerySortColumn.Name:
        return a.name.localeCompare(b.name);
      case SearchQuerySortColumn.Created:
        return a.created - b.created;
      case SearchQuerySortColumn.LastChange:
        return a.lastChange - b.lastChange;
    }
  }
}
