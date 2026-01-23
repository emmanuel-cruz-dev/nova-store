import { useState, useMemo, useCallback } from "react";

export function useBulkSelection<
  T extends {
    id: number | string | null;
  }
>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(
    new Set()
  );

  const isSelected = useCallback(
    (itemId: number | string) => selectedIds.has(itemId),
    [selectedIds]
  );

  const toggleSelection = useCallback((itemId: number | string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allIds = new Set(
      items
        .map((item) => item.id)
        .filter((id): id is number | string => id !== null)
    );
    setSelectedIds(allIds);
  }, [items]);

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.size === items.length) {
      deselectAll();
    } else {
      selectAll();
    }
  }, [selectedIds.size, items.length, selectAll, deselectAll]);

  const checkboxState = useMemo(() => {
    if (selectedIds.size === 0) return "unchecked";
    if (selectedIds.size === items.length) return "checked";
    return "indeterminate";
  }, [selectedIds.size, items.length]);

  const selectedItems = useMemo(
    () => items.filter((item) => item.id !== null && selectedIds.has(item.id)),
    [items, selectedIds]
  );

  return {
    selectedIds: Array.from(selectedIds) as number[],
    selectedItems,
    selectedCount: selectedIds.size,
    isSelected,
    toggleSelection,
    selectAll,
    deselectAll,
    toggleSelectAll,
    checkboxState,
  };
}
