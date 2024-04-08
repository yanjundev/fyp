import { useDidUpdateEffect } from '@/hooks/use-did-update-effect';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TagStyle =
  'flex space-x-1 inline-flex items-center rounded-full border m-1 px-2.5 py-0.5 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground';

export const Tag = ({ text, type, remove, disabled, className }: TagProps) => {
  const router = useRouter();

  const handleTagClick = (e) => {
    e.stopPropagation();

    const url = `explore/search?type=${type}&tag=${text}`;
    router.push(url);
  };

  const handleOnRemove = (e) => {
    e.stopPropagation();
    remove(text);
  };

  return (
    <span className={className || TagStyle}>
      <span onClick={handleTagClick}>#{text}</span>
      {!disabled && (
        <button
          type='button'
          onClick={handleOnRemove}
          aria-label={`remove ${text}`}
        >
          &#10005;
        </button>
      )}
    </span>
  );
};

interface TagProps {
  text: string;
  type: 'post' | 'plan';
  remove?: any;
  disabled?: boolean;
  className?: string;
}

const defaultSeparators = ['Enter', ' '];

const InputStyle = 'outline-none';

export const TagInput = ({
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  separators,
  disableBackspaceRemove,
  onExisting,
  onRemoved,
  disabled,
  isEditOnRemove,
  isTag,
  onKeyUp,
  classNames,
}: TagInputProps) => {
  const [tags, setTags] = useState<string[]>(value || []);

  useDidUpdateEffect(() => {
    onChange && onChange(tags);
  }, [tags]);

  useDidUpdateEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(tags)) {
      setTags(value);
    }
  }, [value]);

  const handleOnKeyUp = (e) => {
    e.stopPropagation();

    const text = e.target.value;

    if (
      !text &&
      !disableBackspaceRemove &&
      tags.length &&
      e.key === 'Backspace'
    ) {
      e.target.value = isEditOnRemove ? `${tags.at(-1)} ` : '';
      setTags([...tags.slice(0, -1)]);
    }

    if (text && (separators || defaultSeparators).includes(e.key)) {
      e.preventDefault();
      if (isTag && !isTag(text)) return;

      if (tags.includes(text)) {
        onExisting && onExisting(text);
        return;
      }
      setTags([...tags, text]);
      e.target.value = '';
    }
  };

  const onTagRemove = (text: string) => {
    setTags(tags.filter((tag) => tag !== text));
    onRemoved && onRemoved(text);
  };

  return (
    <div aria-labelledby={name} className='flex flex-wrap'>
      <div className='gap-9'>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} remove={onTagRemove} disabled={disabled} />
        ))}
      </div>

      <input
        className={InputStyle}
        type='text'
        name={name}
        placeholder={placeHolder}
        onKeyDown={handleOnKeyUp}
        onBlur={onBlur}
        disabled={disabled}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

interface TagInputProps {
  name?: string;
  placeHolder?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  onBlur?: any;
  separators?: string[];
  disableBackspaceRemove?: boolean;
  onExisting?: (tag: string) => void;
  onRemoved?: (tag: string) => void;
  disabled?: boolean;
  isEditOnRemove?: boolean;
  isTag?: (tag: string) => boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  classNames?: {
    input?: string;
    tag?: string;
  };
}
