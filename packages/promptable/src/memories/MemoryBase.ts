export interface MemoryBase {
    get: (...args: any[]) => string;
    clear: (...args: any[]) => void;
}
  